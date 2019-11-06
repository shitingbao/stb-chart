<template>
  <div class="bg">
    <button @click="getMsg()">getclicktest</button>
    <div class="select">
      <el-select v-model="columnvalue" clearable placeholder="选择筛选列" @change="selectData">
        <el-option
          v-for="item in columnoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-select v-model="conditionvalue" clearable placeholder="选择条件列" @change="selectData">
        <el-option
          v-for="item in conditionoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-input
        class="select-input"
        placeholder="Please input your condition value"
        v-model="inputData"
      ></el-input>
    </div>

    <div class="tb">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="dis" label="dis"></el-table-column>
        <el-table-column prop="alias" label="alias"></el-table-column>
        <el-table-column prop="company" label="company"></el-table-column>
        <el-table-column prop="department" label="department"></el-table-column>
        <el-table-column prop="crd_no" label="crd_no"></el-table-column>
        <el-table-column prop="truck_no" label="truck_no"></el-table-column>
        <el-table-column prop="truck_type" label="truck_type"></el-table-column>
        <el-table-column prop="last_conn" label="last_conn"></el-table-column>
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
      inputData: "",
      test: null,
      tableData: [],
      showTableData: [],
      columnvalue: "",
      conditionvalue: "",
      columnoptions: [
        {
          value: "dis",
          label: "dis"
        },
        {
          value: "alias",
          label: "alias"
        },
        {
          value: "company",
          label: "company"
        },
        {
          value: "department",
          label: "department"
        },
        {
          value: "crd_no",
          label: "crd_no"
        },
        {
          value: "truck_no",
          label: "truck_no"
        },
        {
          value: "truck_type",
          label: "truck_type"
        },
        {
          value: "last_conn",
          label: "last_conn"
        },
        {
          value: "online",
          label: "online"
        }
      ],
      conditionoptions: [
        {
          value: "=",
          label: "等于"
        },
        {
          value: ">",
          label: "大于"
        },
        {
          value: "<",
          label: "小于"
        },
        {
          value: "!=",
          label: "不等于"
        }
      ]
    };
  },
  methods: {
    selectData: function(value) {
      console.log("your select option is:", value);
    },
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
          that.showTableData = e.data;
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
  width: 100%;
  .tb {
    width: 100%;
    border: 1px solid rgb(160, 157, 157);
    .tb-column {
      width: 50px;
    }
  }
  .select {
    flex-direction: row;
    .select-input {
      width: 200px;
    }
  }
}
</style>
