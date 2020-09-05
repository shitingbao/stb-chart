<template>
  <div>
    <el-button type="primary" @click="upload" plain>比较</el-button>
    <div class="comparison">
      <el-upload
        :on-change="leftChange"
        class="upload-demo"
        drag
        action
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>

      <el-upload
        :on-change="rightChange"
        class="upload-demo"
        drag
        action
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </div>
    <editor
      v-model="sameContent"
      @init="editorInit"
      :options="options"
      lang="json"
      theme="chrome"
      width="500"
      height="500"
    ></editor>
    <div class="comparison">
      <editor
        v-model="leftContent"
        @init="editorInit"
        lang="json"
        theme="chrome"
        width="500"
        height="100"
      ></editor>
      <editor
        v-model="rightContent"
        @init="editorInit"
        :options="options"
        lang="json"
        theme="chrome"
        width="500"
        height="500"
      ></editor>
    </div>
  </div>
</template>

<script>
export default {
  name: "FileComparison",
  components: {
    editor: require("vue2-ace-editor")
  },
  data() {
    return {
      msg: "FileComparison",
      leftContent: "",
      rightContent: "",
      sameContent: "",
      leftFile: {},
      rightFile: {},
      options: {
        //编辑框的一些配置
        /*vue2-ace-editor编辑器配置自动补全等*/
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true /*自动补全*/,
        readOnly: true
      }
    };
  },
  mounted() {},
  methods: {
    show() {},
    editorInit: function() {
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/html");
      require("brace/mode/javascript"); //language
      require("brace/mode/less");
      require("brace/theme/chrome");
      require("brace/snippets/javascript"); //snippet

      require("brace");
      require("brace/mode/json");
      require("brace/snippets/json");
      require("brace/snippets/html");
    },
    upload() {
      let param = new FormData(); // 创建form对象
      param.append("lsep", ","); // 添加form表单中其他数据
      param.append("listitle", "false"); // 添加form表单中其他数据
      param.append("rsep", ","); // 添加form表单中其他数据
      param.append("ristitle", "false"); // 添加form表单中其他数据
      param.append("left", this.leftFile.raw);
      param.append("right", this.rightFile.raw);
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      // 添加请求头
      var that = this;
      this.$http.post("/filecomparison", param, config).then(response => {
        that.leftContent = JSON.stringify(response.data.LeftAims, null, "\t");
        that.rightContent = JSON.stringify(response.data.RightAims, null, "\t");
        that.sameContent = JSON.stringify(
          response.data.SameDataLists,
          null,
          "\t"
        );
      });
    },
    leftChange(file) {
      this.leftFile = file;
    },
    rightChange(file) {
      this.rightFile = file;
    }
  }
};
</script>
<style lang="scss" scoped>
.comparison {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
