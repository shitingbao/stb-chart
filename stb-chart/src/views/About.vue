<template>
  <div class="about">
    <el-upload ref="upload" action="/" :show-file-list="false" :on-change="importExcel" :auto-upload="false">
      <el-button slot="trigger" icon="el-icon-upload" size="small" type="primary">
        上传文件
      </el-button>
    </el-upload>
    <button @click="output">get</button>
  </div>
</template>
<script>
// import * as d3 from "d3";
import XLSX from "xlsx";
export default {
  methods: {
    importExcel(file) {
      // let file = file.files[0] // 使用传统的input方法需要加上这一步
      const types = file.name.split(".")[1];
      const fileType = ["xlsx", "xlc", "xlm", "xls", "xlt", "xlw", "csv"].some(
        item => item === types
      );
      if (!fileType) {
        alert("格式错误！请重新选择");
        return;
      }
      this.file2Xce(file).then(tabJson => {
        if (tabJson && tabJson.length > 0) {
          this.xlsxJson = tabJson;
        }
      });
    },
    file2Xce(file) {
      return new Promise(function(resolve) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const data = e.target.result;
          this.wb = XLSX.read(data, {
            type: "binary"
          });
          const result = [];
          this.wb.SheetNames.forEach(sheetName => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
            });
          });
          resolve(result);
          console.log("res:", result);
        };
        reader.readAsBinaryString(file.raw);
      });
    },
    output() {
      this.exportCvs();
    },
    exportCvs() {
      var storageObj = {
        title: ["时间", "label名称", "点击次数"],
        titleForKey: ["labelTime", "lableName", "labelCount"],
        data: [
          {
            labelTime: "value1",
            lableName: "value2",
            labelCount: "value3"
          },
          {
            labelTime: "value4",
            lableName: "value5",
            labelCount: "value6"
          },
          {
            labelTime: "value7",
            lableName: "value8",
            labelCount: "value9"
          }
        ]
      };
      // var title = storageObj.title;
      var titleForKey = storageObj.titleForKey;
      var data = storageObj.data;
      var str = [];
      str.push(storageObj.title.join(",") + "\n");
      for (var i = 0; i < data.length; i++) {
        var temp = [];
        for (var j = 0; j < titleForKey.length; j++) {
          temp.push(data[i][titleForKey[j]]);
        }
        str.push(temp.join(",") + "\n");
      }
      var uri =
        "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(str.join(""));
      var downloadLink = document.createElement("a");
      downloadLink.href = uri;
      downloadLink.download =
        new Date().toISOString().substring(0, 10) + "-labelDetail.csv";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }
};
</script>