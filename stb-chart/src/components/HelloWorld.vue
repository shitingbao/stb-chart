<template>
  <div class="HelloWorld">
    <h1>{{ msg }}</h1>

    <el-date-picker
      @change="setChangeTime"
      v-model="dateValue"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker>
    <button @click="getData">getData</button>
  </div>
</template>

<script>
export default {
  methods: {
    getData() {
      let param = {
        start: this.dateValue[0],
        stop: this.dateValue[1]
      };
      let config = {
        headers: { "stbweb-api": "date" }
      };
      this.$http.post("/date", param, config).then(response => {
        console.log(response.data);
      });
    },
    setChangeTime() {
      if (this.dateValue == null) {
        return;
      }
      this.dateValue[0] = this.changeDate(this.dateValue[0]);
      this.dateValue[1] = this.changeDate(this.dateValue[1]);
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
      return this.changeDate(today);
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
    this.dateValue.push(this.getDay(-7));
    this.dateValue.push(this.getDay(0));
  },
  data() {
    return {
      dateValue: []
    };
  },
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<style scoped lang="scss">
</style>
