<template>
  <div class="bg">
    <button @click="getMsg()">getclicktest</button>
    <div class="tb">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="dis" label="dis" width="160"></el-table-column>
        <el-table-column prop="alias" label="alias" width="55"></el-table-column>
        <el-table-column prop="company" label="company"></el-table-column>
        <el-table-column prop="department" label="department" width="180"></el-table-column>
        <el-table-column prop="crd_no" label="crd_no" width="120"></el-table-column>
        <el-table-column prop="truck_no" label="truck_no"></el-table-column>
        <el-table-column prop="truck_type" label="truck_type" width="180"></el-table-column>
        <el-table-column prop="last_conn" label="last_conn" width="180"></el-table-column>
        <el-table-column prop="online" label="online"></el-table-column>
      </el-table>
    </div>
    <div v-if="test!=null">{{test[0]}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      test: null,
      tableData: []
    };
  },
  methods: {
    getMsg: function() {
      console.log("start get");
      let that = this;
      //   get请求;
      that
        .$http({
          method: "GET",
          url: `https://api.imowfms.com/web/dis/list`,
          headers: {
            token: "62f80fdb90a9f766b7fa3294c4dab443"
          }
        })
        .then(function(e) {
          console.log("data:", e);
          that.test = e.data;
          that.tableData = e.data;
        })
        .catch(function(err) {
          console.log("this error is:", err);
        }); //失败后执行的逻辑;
    }
  }
};
</script>
<style lang="scss">
.bg {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .tb {
    border: 1px solid rgb(160, 157, 157);
    .tb-column {
      width: 50px;
    }
  }
}
</style>
