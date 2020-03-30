<template>
  <div class="HelloWorld">
    <h1>{{ msg }}</h1>

    <el-date-picker
      @change="setchangetime"
      v-model="value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  methods: {
    setchangetime() {
      this.start = this.changeDate(this.value1[0]);
      this.stop = this.changeDate(this.value1[1]);
    },

    // 获取当前时间，day为number，getDay(-1):昨天的日期;getDay(0):今天的日期;getDay(1):明天的日期;【以此类推】
    changeDate(da) {
      var tYear = da.getFullYear();
      var tMonth = da.getMonth();
      var tDate = da.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate = this.doHandleMonth(tDate);
      return tYear + "-" + tMonth + "-" + tDate;
    },
    getDay(day) {
      var today = new Date();
      var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetday_milliseconds); //注意，这行是关键代码
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate = this.doHandleMonth(tDate);
      return tYear + "-" + tMonth + "-" + tDate;
    },
    doHandleMonth(month) {
      var m = month;
      if (month.toString().length == 1) {
        m = "0" + month;
      }
      return m;
    }
  },
  mounted() {
    this.value1.push(this.getDay(-7));
    this.value1.push(this.getDay(0));
    var param = {
      start: this.value1[0],
      stop: this.value1[1]
    };
    console.log("", param);
  },
  data() {
    return {
      value1: [],
      start: "",
      stop: ""
    };
  },
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
