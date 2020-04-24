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

    <el-button @click="getMsg">getMsg</el-button>
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
    },
    getMsg: function() {
      let that = this;
      //   get请求;
      that
        .$http({
          method: "GET",
          params: {
            bigIndustryCode: "02",
            midIndustryCode: null,
            minIndustryCode: null,
            monitortagCodes: null
          },
          url: `http://223.71.93.178:33334/api/gcIot-supervise-manholecover/ManholeCover/getManholeCoverGeoJson`,
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqaW5hbiIsInVzZXJfbmFtZSI6ImppbmFuIiwiaXNTdXBlckFkbWluIjoiMCIsInVzZXJOYW1lIjoi5rWO5Y2XIiwidXNlcklkIjoiODE5MTQ5NGEzZjZkNGVkM2I1ZjUwZGI5NjhlMjg0MGIiLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwiY2xpZW50X2lkIjoid3VsaWFud2FuZ2ppZXJ1Iiwic2NvcGUiOlsicmVhZCJdLCJleHBpcmUiOjE1ODc3MDE2NDkzNjQsImV4cCI6MTU4NzcwMTY0OSwiZGVwYXJ0IjoiMmQ0YjA1YTUwNzAxNGYxZTlkMzIxOGRlYTIxMzYwN2QiLCJqdGkiOiJkNDlmZDJjNC04ZWZlLTQyYjAtYjQ2Yy04Y2U5YWYwYTRkZTYiLCJ0ZW5hbnQiOiJjYjQ1NWI1ZWJjNTg0NDJjYmQ3Y2M0OWEwNjI4MGJkNCJ9.BEF9aqUc77RsnUkCanV8F_feUsnI8bRjxl9Q7eQlClykZBOjct9nJ3pwmQD8mTAgAnSFUUpVQZINRLCJ39XEz2rVcq0ph8yhv9WMeAozP_PGJtlNQtSb3qUHmAnUbzGuR8CREVb5c0ieSAtI4C2fb6YSPqWLF5bfHDUgIL3NZdU"
          }
        })
        .then(function(res) {
          console.log("res:", res);
        })
        .catch(function(err) {
          console.log("this error is:", err);
        }); //失败后执行的逻辑;
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
