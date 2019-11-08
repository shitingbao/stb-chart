<template>
  <div class>
    <el-button
      class="void"
      @click="sendParaent"
    >收起</el-button>
    <!-- <button @click="getMsg">get</button>
    <button @click="show">show</button> -->
    <div
      id="myChart"
      :style="{width: '1200px', height: '500px'}"
    ></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Chart",
  props: {
    msg: String
  },
  data() {
    return {
      option: {
        xAxis: {
          type: "category",
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [],
            type: "line"
          }
        ]
      }
    };
  },
  mounted: function() {
    this.getMsg();
    this.drawLine();
  },
  watch: {
    msg: function() {
      this.getMsg();
      this.drawLine();
    }
  },
  methods: {
    sendParaent: function() {
      this.$emit("getChildData", "我是父组件！");
    },
    drawLine: function() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption(this.option);
    },
    show: function() {
      console.log("option:", this.option);
    },
    //请求取值，获取表内所有数据，init获取
    getMsg: function() {
      this.option.xAxis.data = [];
      this.option.series[0].data = [];
      let that = this;
      //   get请求;
      that
        .$http({
          method: "GET",
          params: {
            dis: that.msg,
            start: "2019-07-10 15:58:05",
            stop: "2019-07-10 16:00:28",
            chart: "motor_cur",
            control: "control_tr2"
          },
          url: `https://api.imowfms.com/web/dis/chart/data`,
          headers: {
            token: "5dbfc265f6f1f8bce57b37b398f632dd"
          }
        })
        .then(function(res) {
          res.data.data.forEach(element => {
            that.option.xAxis.data.push(element.datetime);
            that.option.series[0].data.push(element.getdata);
            that.drawLine();
          });
        })
        .catch(function(err) {
          console.log("this error is:", err);
        }); //失败后执行的逻辑;
    }
  }
};
</script>
<style lang="scss">
.void {
  margin-top: 40px;
}
</style>
