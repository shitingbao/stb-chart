<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="http://localhost:8088/formfile"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :on-success="handsuccess"
    >
      <el-button
        slot="trigger"
        size="small"
        type="primary"
      >选取文件</el-button>
      <el-button
        style="margin-left: 10px;"
        size="small"
        type="success"
        @click="submitUpload"
      >上传到服务器</el-button>
      <div
        slot="tip"
        class="el-upload__tip"
      >只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <button @click="show">show</button>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
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
      ]
    };
  },
  methods: {
    show: function() {
      console.log("ref:", this.$refs);
      console.log("filelist:", this.fileList);
    },
    handsuccess: function(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
    },
    handerror: function(err, file, fileList) {
      console.log(err);
      console.log(file);
      console.log(fileList);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>
