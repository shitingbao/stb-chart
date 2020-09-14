<template>
  <div>
    <button @click="downloadExcel">xiazai</button>
    <a :href="'D:/mygo/src/stbweb/builds/common/assets/FaultCode.csv'"
      >下载模板</a
    >
    <el-upload
      class="upload-demo"
      ref="upload"
      action="/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :file-list="fileList"
      :auto-upload="false"
      multiple
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px;"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
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
      //upload中用于展示的列表
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      //表单中要上传的文件
      formFileList: []
    };
  },
  methods: {
    downloadExcel() {
      window.location.href =
        "D:/mygo/src/stbweb/builds/common/assets/FaultCode.csv";
    },
    changeFile(file) {
      this.formFileList.push({ name: file.name, fData: file.raw });
      console.log("change:", file);
    },
    submitUpload() {
      // this.$refs.upload.submit();
      let param = new FormData(); // 创建form对象
      for (let i = 0; i < this.formFileList.length; i++) {
        console.log("i:", this.formFileList[i].name);
        param.append(i + "", this.formFileList[i].fData);
      }
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      console.log("param:", param);
      this.$http.post("/export", param, config).then(response => {
        console.log(response);
      });
      this.fileList = [];
      this.formFileList = [];
    },
    handleRemove(file, fileList) {
      console.log("remove:", file, fileList);
      var index = this.formFileList.findIndex(item => {
        if (item.name == file.name) {
          return true;
        }
      });
      this.list.splice(index, 1);
    },
    handlePreview(file) {
      console.log("preview:", file);
    }
  }
};
</script>
