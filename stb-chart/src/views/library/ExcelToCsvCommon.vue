<template>
  <div>
    <div class="description">
      <h2 class="description-title">使用说明</h2>
      <ul>
        <li>在输入或者输出文件采用csv/txt文件时，可选填文件类型信息</li>
        <li>
          默认使用的分隔符是英文“ ,
          ”，在使用其他分隔符时，注意不要和文件内容冲突
        </li>
        <li>
          utf8和gbk代表对应文件编码格式，文本分隔符代表文本文件数据之间的分隔标识
        </li>
      </ul>
    </div>
    <h4>文件选择</h4>
    <div class="select-common">
      <div class="select-common-tab">
        <span>上传文件信息（选填）：</span>
        <el-switch
          class="switch"
          v-model="upIsGBK"
          active-text="gbk"
          inactive-text="utf8"
        >
        </el-switch>
        <span>文本文件分隔符：</span>
        <el-input
          class="tab-input"
          v-model="upInput"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="select-common-tab">
        <span>下载文件信息（选填）：</span>
        <el-switch
          class="switch"
          v-model="downIsGBK"
          active-text="gbk"
          inactive-text="utf8"
        >
        </el-switch>
        <span>文本文件分隔符：</span>
        <el-input
          class="tab-input"
          v-model="downInput"
          placeholder="请输入内容"
        ></el-input>
      </div>
    </div>
    <el-upload
      :on-change="changeFile"
      class="upload"
      drag
      action="/"
      :show-file-list="false"
      :auto-upload="false"
    >
      <i v-if="isFileSelect" class="el-icon-tickets avatar-uploader-icon "></i>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <div v-if="isFileSelect" class="avatar-filename">
        {{ selectFileName }}
      </div>
    </el-upload>
    <el-button
      class="compare-button"
      type="primary"
      @click="submitUpload(fileType)"
      plain
      >提交</el-button
    >
    <el-button class="compare-button" type="primary" @click="clear()" plain
      >清空</el-button
    >
  </div>
</template>
<script>
// import * as d3 from "d3";
//一般采用第二种方法来处理excel文件
// import XLSX from "xlsx";
export default {
  name: "ExcelToCsvCommon",
  props: {
    fileType: String
  },
  data() {
    return {
      upInput: "", //上传文件分隔符
      downInput: "", //下载文件分隔符
      isFileSelect: false,
      selectFileName: "",
      upIsGBK: false, //上传文件分隔符
      downIsGBK: false, //下载文件分隔符
      formFile: {} //上传文件
    };
  },
  methods: {
    clear() {
      this.isFileSelect = false;
      this.selectFileName = "";
      this.formFile = {};
    },

    changeFile(file) {
      this.formFile = file.raw;
      this.selectFileName = file.name;
      this.isFileSelect = true;
    },
    //默认提交，不考虑分隔符和编码格式
    submitUpload(createFileType) {
      let param = new FormData(); // 创建form对象
      param.append("file", this.formFile);
      param.append("sep", this.upInput);
      param.append("gbk", this.upIsGBK);
      param.append("createSep", this.downInput);
      param.append("isCreateGBK", this.downIsGBK);
      param.append("createFileType", createFileType);
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      this.$http.post("/export", param, config).then(response => {
        console.log(response.data);
      });
      this.isFileSelect = false;
      this.selectFileName = "";
      this.formFile = {};
    }
  }
};
</script>
<style lang="scss" scoped>
.description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .description-title {
    padding: 0px;
    margin: 0px;
  }
}
.el-tab {
  padding: 0px 30px 0px 30px;
  .switch {
    padding-bottom: 10px;
  }
}
.select-common {
  display: flex;
  justify-content: center;
  padding: 0px 0px 10px 0px;
  flex-direction: column;
  align-items: center;
  .select-common-tab {
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
    .tab-input {
      width: 200px;
      margin-top: -6px;
    }
  }
}
.switch {
  padding: 0px 10px 0px 10px;
}
.avatar-uploader-icon {
  display: flex;
  justify-content: center;
  font-size: 48px;
  line-height: 165px;
  color: #8c939d;
}
.avatar-filename {
  margin-top: -20px;
}
</style>
