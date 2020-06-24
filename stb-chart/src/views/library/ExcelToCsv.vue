<template>
  <div>
    <el-upload
      ref="upload"
      action="/"
      :show-file-list="false"
      :on-change="importCsv"
      :auto-upload="false"
    >
      <el-button slot="trigger" icon="el-icon-upload" size="small" type="primary">选择解析文件</el-button>
    </el-upload>
  </div>
</template>
<script>
// import * as d3 from "d3";
//一般采用第二种方法来处理excel文件
// import XLSX from "xlsx";
export default {
  data() {
    return {
      filecontent: [
        //解析后文件内容保存
      ]
    };
  },
  methods: {
    importCsv(file) {
      //   var fileType = file.name.split(".");
      let tfile = {
        status: "ready",
        name: "aa.csv",
        size: file.size,
        percentage: 0,
        uid: file.uid,
        raw: file.raw
      };

      // let tfile = {
      //   lastModified: file.lastModified,
      //   lastModifiedDate: file.lastModifiedDate,
      //   name: "电池示例文件.csv",
      //   size: file.size,
      //   type: file.type,
      //   uid: file.uid,
      //   webkitRelativePath: ""
      // };
      //   file.raw.name = "tt.csv";
      console.log(tfile);
      // console.log(file.raw);
      let param = new FormData(); // 创建form对象
      param.append("tfile", tfile);
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      // 添加请求头
      this.$http.post("/export", param, config).then(response => {
        console.log(response);
      });
    }
  }
};
</script>