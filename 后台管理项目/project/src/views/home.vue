<template>
  <div>
    <h1>00000</h1>
    <div id="con"></div>
  </div>
</template>

<script>
import Echart from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    let mtChart = Echart.init(document.getElementById("co,"));
    let options = {
          title:{
            text:'当前周访问量'
          },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
        },
      ],
    };
  },
};
</script>

<style lang="" scoped>
#con {
  width: 1200px;
  height: 900px;
}
</style>
