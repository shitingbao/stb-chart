<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="http://localhost:3001"
      :on-change="change"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <button @click="show()">show</button>
    <div>
      显示文字
      <ul>
        <li v-for="(item,index) in wordData" :key="index">{{item }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
// import Qs from "qs";
export default {
  data() {
    return {
      fileList: [],
      formFileList: [],
      wordData: []
    };
  },
  methods: {
    show: function() {
      console.log("upload:", this.$refs.upload);
      // this.$refs.upload;uploadFiles
      console.log("upload:", this.$refs.upload.uploadfiles);
    },
    submitUpload() {
      let param = new FormData(); // 创建form对象
      for (let i = 0; i < this.formFileList.length; i++) {
        param.append(i + "", this.formFileList[i].raw); // 通过append向form对象添加数据
      }
      param.append("chunk", "0"); // 添加form表单中其他数据
      // console.log(param.get("file")); // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      let that = this;
      // 添加请求头
      this.$http.post("/image", param, config).then(response => {
        console.log(response.data[0].words_result);
        for (let j = 0; j < response.data.length; j++) {
          for (let i = 0; i < response.data[j].words_result.length; i++) {
            console.log("data:", response.data[j].words_result[i].Words);
            that.wordData.push(response.data[j].words_result[i].Words);
          }
        }
      });
    },
    handleRemove(file, fileList) {
      this.formFileList = fileList;
    },
    change(file) {
      this.formFileList.push(file);
    }
  }
};
</script>
