<template>
  <div>
       <div id="main" ref="chart" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import echarts from "echarts"
import axios from "@/api"
import 'echarts/map/js/china'

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
            series: [{
                type: 'map',
                map:'china',
                label:{
                  show:true
                },
                data:[
                  {name:'北京',value:50000},
                  {name:'新疆',value:20000},
                  {name:'西藏',value:3588},
                  {name:'内蒙古',value:4000},
                ]
            }],
            tooltip: {
                trigger: 'item',
                // 地图 : {a}（系列名称），{b}（区域名称），{c}（合并数值）, {d}（无）
                formatter: '城市名：{b}<br/>数据：{c}人'
            },
             visualMap: {
                min: 800,
                max: 50000,
                text: ['High', 'Low'],
                realtime: false,
                calculable: true,
                inRange: {
                    color: ['lightskyblue', 'yellow', 'orangered']
                }
            },
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },
    getList(){
      axios.get(this.$url+'get_lists').then(res=>{
        this.lists = res.data;
        //this.init();
      })
    }
  }
}
</script>


