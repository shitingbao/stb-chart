<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="http://localhost:8088/images"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :on-success="handsuccess"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      fileList: []
    };
  },
  methods: {
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
    }
  }
};
</script>
