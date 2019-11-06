<template>
  <div class="bg">
    <!-- <button @click="getMsg()">getclicktest</button> -->
    <div class="select">
      <el-select
        class="void"
        v-model="columnvalue"
        clearable
        placeholder="选择筛选列"
        @change="selectData"
      >
        <el-option
          v-for="item in columnoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-select
        class="void"
        v-model="conditionvalue"
        clearable
        placeholder="选择条件列"
        @change="selectData"
      >
        <el-option
          v-for="item in conditionoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-input
        class="select-input void"
        placeholder="Please input your condition value"
        v-model="inputData"
      ></el-input>

      <el-button class="void" @click="find">查询</el-button>
      <el-button class="void" @click="cancle">取消</el-button>
      <button @click="show">show</button>
    </div>

    <div class="tb">
      <el-table :data="showTableData" style="width: 100%">
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
  </div>
</template>
<script lang='ts'>
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
          value: "equal",
          label: "等于"
        },
        {
          value: "notequal",
          label: "不等于"
        },
        {
          value: "!",
          label: "无"
        }
      ],
      comparisonVal: ""
    };
  },
  methods: {
    show: function() {
      console.log("column:", this.columnvalue);
      console.log("condition:", this.conditionvalue);
      console.log("value:", this.inputData);
    },
    cancle: function() {
      this.showTableData = this.tableData;
    },
    selectData: function(value) {
      console.log("your select option is:", value);
    },
    getMsg: function() {
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
          that.test = e.data;
          that.tableData = e.data;
          that.showTableData = e.data;
        })
        .catch(function(err) {
          console.log("this error is:", err);
        }); //失败后执行的逻辑;
    },

    find: function() {
      if (this.columnvalue === "") {
        alert("please a column");
        return;
      }
      if (this.conditionvalue === "") {
        alert("please a condition");
        return;
      }
      this.showTableData = [];
      var that = this;
      switch (this.conditionvalue) {
        case "equal":
          this.tableData.forEach(v => {
            switch (that.columnvalue) {
              case "dis":
                that.comparisonVal = v.dis;
                break;
              case "alias":
                that.comparisonVal = v.alias;
                break;
              case "company":
                that.comparisonVal = v.company;
                break;
              case "department":
                that.comparisonVal = v.department;
                break;
              case "crd_no":
                that.comparisonVal = v.crd_no;
                break;
              case "truck_no":
                that.comparisonVal = v.truck_no;
                break;
              case "truck_type":
                that.comparisonVal = v.truck_type;
                break;
              case "last_conn":
                that.comparisonVal = v.last_conn;
                break;
              case "online":
                that.comparisonVal = v.online;
                break;
              default:
                that.comparisonVal = "";
            }
            if (that.comparisonVal === that.inputData) {
              that.showTableData.push(v);
              console.log(" that.showTableData", that.showTableData);
            }
          });
          break;
        case "notequal":
          this.tableData.forEach(v => {
            switch (that.columnvalue) {
              case "dis":
                that.comparisonVal = v.dis;
                break;
              case "alias":
                that.comparisonVal = v.alias;
                break;
              case "company":
                that.comparisonVal = v.company;
                break;
              case "department":
                that.comparisonVal = v.department;
                break;
              case "crd_no":
                that.comparisonVal = v.crd_no;
                break;
              case "truck_no":
                that.comparisonVal = v.truck_no;
                break;
              case "truck_type":
                that.comparisonVal = v.truck_type;
                break;
              case "last_conn":
                that.comparisonVal = v.last_conn;
                break;
              case "online":
                that.comparisonVal = v.online;
                break;
              default:
                that.comparisonVal = "";
            }
            if (that.comparisonVal !== that.inputData) {
              that.showTableData.push(v);
            }
          });
          break;
        default:
          alert("no operate");
      }
    }
  },
  created: function() {
    //相当于刚开始执行的函数
    this.getMsg();
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
    margin-bottom: 20px;
    .select-input {
      width: 200px;
    }
  }
  .void {
    margin-left: 20px;
  }
}
</style>
