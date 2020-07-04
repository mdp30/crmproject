<template>
  <!--首页组件-->
  <div id="index">
    <div id="mychart" style="width:600px;height:400px"></div>
  </div>
</template>

<script>
import {http,articlebychannel,channelList} from '@/api/api.js'
export default {
   mounted() {
    this.getData()
  },
  data() {
    return {
      typeList:[],
      numList:[]
    };
  },
  methods: {
    // 图标配置
    drwChart(x, y) {
      var myChart = this.$echarts.init(document.getElementById("mychart"));
      var option = {
        title: {
          text: "ECharts "
        },
        tooltip: {},
        legend: {
          data: ["数量"]
        },
        xAxis: {
          data: x
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: y
          }
        ]
      };
      myChart.setOption(option);
    },
    getData(){
      Promise.all(
        [
          this.$http.get(http+channelList),
          this.$http.get(http+articlebychannel)
        ]
        ).then((data)=>{
          // console.log(data[0].data.data)
          // 文章分类数据
          this.typeList = data[0].data.data.map(i=>i.name)
          //文章数量数组
          this.numList =  data[1].data.data.map(v=>v.articles)
          this.drwChart(this.typeList, this.numList)
          
      },(err)=>{
        console.log('出错了')
      })
    }
  },
 
};
</script>

<style>
</style>