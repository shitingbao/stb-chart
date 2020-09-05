<template>
  <div>
    <h2>图片文字提取</h2>
    <div class="img-word">
      <div class="img-word-left">
        <el-upload
          class="upload"
          drag
          ref="upload"
          action="/"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="change"
        >
          <i
            v-if="isFileSelect"
            class="el-icon-tickets avatar-uploader-icon "
          ></i>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div v-if="isFileSelect" class="avatar-filename">{{ filename }}</div>
        </el-upload>
        <!-- <div v-if="isFileSelect">{{ filename }}</div> -->
        <el-button class="upload-button" @click="submitUpload" round
          >清空选择</el-button
        >
        <el-button class="upload-button" @click="submitUpload" round
          >提交</el-button
        >
        <h4>上传历史</h4>
        <div class="img-history">
          <ul>
            <li v-for="(item, index) in fileHistoryName" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      <div>
        显示文字
        <ul>
          <li v-for="(item, index) in wordData" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ImageUpload",
  data() {
    return {
      formFileList: [], //保存要提交的文件内容
      wordData: [], //保存解析出来的文字
      isFileSelect: false, //是否显示选择的文件名，图标
      fileHistoryList: [{ name: "", data: "" }], //保存历史查询数据，文件名称对应数据
      fileHistoryName: [
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1"
      ], //保存历史查询文件名称，用来对应数据
      filename: "" //选择的文件名称
    };
  },
  methods: {
    submitUpload() {
      this.isFileSelect = false;
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
      let resData = [];
      // 添加请求头
      this.$http.post("/image", param, config).then(response => {
        // console.log(response.data[0].words_result);
        for (let j = 0; j < response.data.length; j++) {
          for (let i = 0; i < response.data[j].words_result.length; i++) {
            // console.log("data:", response.data[j].words_result[i].Words);
            resData.push(response.data[j].words_result[i].Words);
          }
        }
        that.wordData = resData;
        this.fileHistoryList.push({ name: this.filename, data: that.wordData });
        this.fileHistoryName.push(this.filename);
      });
      this.formFileList = [];
    },

    change(file) {
      this.isFileSelect = true;
      this.filename = file.name;
      this.formFileList.push(file);
    }
  }
};
</script>
<style lang="scss" scoped>
.img-word {
  display: flex;
  flex-direction: row;
  .img-word-left {
    width: 35%;
    .upload {
      height: 200px;
      overflow-y: auto;
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
      .upload-select {
        position: absolute;
      }
    }
    .img-history {
      display: flex;
      justify-content: center;
      padding-top: 20px;
      height: 400px;
      overflow: auto;
    }
  }
}
</style>
