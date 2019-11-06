<template>
  <div class="bg">
    <button>getData</button>
    <div class="tb-border">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180"></el-table-column>
        <el-table-column prop="name" label="Name" width="180"></el-table-column>
        <el-table-column prop="address" label="Address"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        }
      ]
    };
  },
  getMsg: function() {
    console.log("start get");
    let that = this;
    //get请求
    that.$http
      .get("http://localhost:8088/")
      .then(res => {
        console.log("this data is:", res);
      }) //执行成功后执行，res为反馈的数据
      .catch(function(err) {
        console.log("this error is:", err);
      }); //失败后执行的逻辑
  }
};
</script>
<style lang="scss">
.bg {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .tb-border {
    border: 1px solid rgb(160, 157, 157);
  }
}
</style>
