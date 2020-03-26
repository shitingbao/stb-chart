<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="http://localhost:3001"
      :headers="myHeader()"
      :before-upload="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :on-success="handsuccess"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <button @click="show()">show</button>
  </div>
</template>

<script lang="ts">
import Qs from "qs";
export default {
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    myHeader() {
      return {
        authToken: ""
      };
    },
    show: function() {
      console.log("upload:", this.$refs.upload);
      // this.$refs.upload;uploadFiles
      console.log("upload:", this.$refs.upload.uploadfiles);
    },
    handsuccess: function(response, file, fileList) {
      console.log("success:", response.data);
      console.log(file);
      console.log(fileList);
    },
    handerror: function(err, file, fileList) {
      console.log("handerror:", err);
      console.log(file);
      console.log(fileList);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log("remove:", file, fileList);
    },
    handlePreview(file) {
      console.log("preview:", file);
      this.$http({
        method: "post",
        url: "/image", // 路径
        data: {
          name: file
          // pwd: 123456
        },
        transformRequest: [
          function(data) {
            let ret = "";
            ret = Qs.stringify(data); // 注释方法是不使用插件
            // for (let it in data) {
            //   // ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            //   ret += it + '=' + data[it] + '&';
            // }
            return ret;
          }
        ]
        // headers: {
        //   "Content-Type": "application/x-www-form-urlencoded"
        // }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
