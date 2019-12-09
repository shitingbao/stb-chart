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
      <el-button class="void" @click="show">show</el-button>
    </div>

    <div class="el">
      <el-table :data="showTableData" stripe height="650" class="el-table">
        <el-table-column prop="dis" label="dis" width="150"></el-table-column>
        <el-table-column prop="alias" label="alias"></el-table-column>
        <el-table-column prop="company" label="company"></el-table-column>
        <el-table-column prop="department" label="department"></el-table-column>
        <el-table-column prop="crd_no" label="crd_no"></el-table-column>
        <el-table-column prop="truck_no" label="truck_no"></el-table-column>
        <el-table-column prop="truck_type" label="truck_type"></el-table-column>
        <el-table-column
          prop="last_conn"
          label="last_conn"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="online"
          label="online"
          width="70"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Chart
      v-if="isHideChild"
      v-bind:msg="sendChildData"
      @getChildData="showChild"
    />
  </div>
</template>
<script lang="ts">
import Chart from "../components/Chart.vue";

export default {
  name: "bg",
  components: {
    Chart
  },
  data() {
    return {
      sendChildData: "123",
      isHideChild: false,
      resData: "",
      inputData: "", //保存用户输入
      test: null,
      tableData: [], //保存表内所有数据，不参与展示
      showTableData: [], //保存表内用来显示的数据
      columnvalue: "", //选择的列名称
      conditionvalue: "", //选择的条件
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
      ], //列对应关系
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
      ], //条件对应关系
      comparisonVal: "" //对应关系比较值
    };
  },
  methods: {
    //测试展示
    handleClick(row) {
      this.sendChildData = row.dis;
      this.isHideChild = true;
      console.log(row.dis);
    },
    showChild: function(e) {
      this.isHideChild = false;
      console.log(e);
    },
    show: function() {
      console.log("column:", this.columnvalue);
      console.log("condition:", this.conditionvalue);
      console.log("value:", this.inputData);
    },
    //取消恢复初始，去除所有条件，展示所有数据
    cancle: function() {
      this.showTableData = this.tableData;
    },
    //下拉选框选择触发
    selectData: function(value) {
      console.log("your select option is:", value);
    },
    //请求取值，获取表内所有数据，init获取
    getMsg: function() {
      let that = this;
      //   get请求;
      that
        .$http({
          method: "GET",
          url: `https://api.imowfms.com/web/dis/list`,
          headers: {
            token: "86736d70763adb7a723811de271b24b0"
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
    //获取用户输入的列名称和条件，筛选展示数据
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
  .el {
    width: 75%;
    border: 1px solid rgb(160, 157, 157);
    .el-table {
      width: 100%;
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
