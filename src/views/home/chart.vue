<template>
  <div>
       <div id="main" ref="chart" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import echarts from "echarts"
import axios from "@/api"

export default {
  data() {
    return {
      lists:[]
    }
  },
  mounted(){
    this.init();
    //this.getList();
  },
  methods:{
    init(){
      // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.$refs.chart);

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },
    getList(){
      axios.get(this.$url+'get_lists').then(res=>{
        this.lists = res.data;
      })
    }
  }
}
</script>


