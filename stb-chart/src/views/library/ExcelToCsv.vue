<template>
  <div>
    <el-tabs class="el-tab" v-model="activeName">
      <el-switch
        v-model="isOrdinary"
        active-color="#13ce66"
        inactive-color="#1E90FF"
        active-text="高级模式"
        inactive-text="普通模式"
        class="switch"
      >
      </el-switch>

      <el-tab-pane label="生成csv" name="first">
        <el-upload
          v-if="!isOrdinary"
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
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload('csv')"
            >上传到服务器</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传xlsx,csv,txt文件，且不超过20M
          </div>
        </el-upload>
        <ExcelToCsvCommon fileType="csv" v-if="isOrdinary"></ExcelToCsvCommon>
      </el-tab-pane>
      <el-tab-pane label="生成excel" name="second">
        <el-upload
          v-if="!isOrdinary"
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
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload('excel')"
            >上传到服务器</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传csv/txt文件，且不超过500kb
          </div>
        </el-upload>
        <ExcelToCsvCommon fileType="excel" v-if="isOrdinary"></ExcelToCsvCommon>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// import * as d3 from "d3";
//一般采用第二种方法来处理excel文件
// import XLSX from "xlsx";
import ExcelToCsvCommon from "./ExcelToCsvCommon";
export default {
  components: {
    ExcelToCsvCommon
  },
  data() {
    return {
      isOrdinary: false, //是否是普通选项,false为普通选项
      activeName: "first", //默认显示哪个卡片
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
    //默认提交，不考虑分隔符和编码格式
    submitUpload(createFileType) {
      for (let i = 0; i < this.formFileList.length; i++) {
        let param = new FormData(); // 创建form对象
        param.append("file", this.formFileList[i].fData);
        // param.append("sep", "");
        // param.append("gbk", "");
        // param.append("createSep", "");
        // param.append("isCreateGBK", "");
        param.append("createFileType", createFileType);
        let config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
        this.$http.post("/export", param, config).then(response => {
          console.log(response.data);
        });
      }
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
<style lang="scss" scoped>
.el-tab {
  padding: 0px 30px 0px 30px;
  .switch {
    padding-bottom: 10px;
  }
}
</style>
