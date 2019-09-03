<template>
  <div>
    <div id="chart" class="chart-container" style="height: 600px; width: 1000px;"></div>

  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import echarts from 'echarts'
import moment from 'moment'


const colorSets = ["#1890ff", "#2fc25b", "#facc14", "#223273", "#8543e0", "#13c2c2", "#3436c7", "#f04864"]

export default {
  data(){
    return {

    }
  },

  mounted() {
    this.loadData(),
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
    async loadData(){
      try{
        await this.getConditionList({uptime: "", cpu: "", useram: ""})
      }catch(e) {
        console.log(e)
      }
    },
    // timexAxis(){
    //   var now = new Date();
    //   var res=[];
    //   var len =720;
    //   while(len--) {
    //     res.unshift(now.toLocaleString().replace(/^\D*/,''));
    //     now = new Date(now - 1000);
    //   }
    //   return res;
    // },
    timexAxis(){
      var data = this.useConditionList;
      let date, dateconvert;
      var res=[];
      for(let i=data.length-1; i>0; i--){
        dateconvert = parseInt((data[i].uptime));
        date = this.$moment(dateconvert).format('Y-MM-DD HH:mm:ss')
        res.push(date)
      }
     return res;
     console.log("date:"+res)
    },
    convertCPU(){
      var data = this.useConditionList;
      let cpu,cpuPer;
      var res = [];
      for(let i=0; i<data.length; i++){
        cpu = parseInt((data[i].cpu));
        if(cpu == NaN)
          cpuPer = 0
        else
          cpuPer = parseFloat(cpu).toFixed(2)
        res.push(cpuPer)
      }
      return res
    },

    convertGB(){
      var data = this.useConditionList;
      let ram
      var res = [];
      for(let i=0; i<data.length; i++){
        ram = parseFloat((data[i].useram/1024)).toFixed(2)
        res.push(ram)
    }
      return res

    },




    loadChart(){
      this.Chart = echarts.init(document.getElementById('chart'))
      this.chartOpt = {
        color: colorSets,
        tooltip: {
          trigger: 'axis',
          borderColor:colorSets,
          formatter: function (params) {
            params = params[0];
            let title = '<span style="display: inline-block; font-weight: bold;">'+params.seriesName+'</span><br/>';
            let date = '<span style="display: inline-block; ">'+params.name+'</span><br/>';
            let data;
            if(params.seriesName == 'CPU使用率')
            {
              data = '<span style="display: inline-block; ">'+params.value+'%</span>';
            }
            else{
              data = '<span style="display: inline-block; ">'+params.value+'GB</span>';
            }
        
            let style ='<div class="tooltip">'+title+date+data+'</div>';
            return style

          },
          axisPointer: {
            animation: false
          }
        },
        title: [{
          left: 'center',
          text: 'CPU使用率'
          }, {
            top: '50%',
            left: 'center',
            text: '内存使用量'
        }],
        grid: [{
          id: 0,
          top: '10%',
          left: 100,
          right: 20,
          height: 150
        },
        {
          id: 1,
          left: 100,
          right: 20,
          top: '55%',
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
          }
        ],
        yAxis: [
          {
            id: 0,
            type: 'value',
            min: 0,
            max: 100,
            splitLine: {show: false}
            // show: false,
          },
          {
            gridIndex: 1,
            id: 1,
            type: 'value',
            min:10.9,
            max:11.1,
            splitLine: {show: false}
            // show: false,
          }
        ],
        series: [
          {
            name: 'CPU使用率',
            type: 'line',
            showSymbol: false,
            data: (this.convertCPU)(),
          },
          {
            name: '内存使用量',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            showSymbol: false,
            data: (this.convertGB)(),
          }
        ]
      };
      this.Chart.setOption(this.chartOpt);

    }
  }
}
</script>
<style lang="less">



</style>
