
<template>
  <div>
    <el-button type="primary" @click="show" plain>比较</el-button>
    <div class="comparison">
      <el-upload class="upload-demo" drag action multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
          <editor
            v-model="content"
            @init="editorInit"
            lang="json"
            theme="chrome"
            width="500"
            height="100"
          ></editor>
        </div>
      </el-upload>

      <el-upload class="upload-demo" drag action multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
          <editor
            v-model="content"
            @init="editorInit"
            :options="options"
            lang="json"
            theme="chrome"
            width="500"
            height="500"
          ></editor>
        </div>
      </el-upload>
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
      content: "",

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
    show() {
      let data = {
        "1": ["aa"],
        "4": ["aa", "bb", "cc"],
        "5": ["", "aa", "bb", "cc", "dd"]
      };
      this.content = JSON.stringify(data, null, "\t");
    },
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